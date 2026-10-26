# Authentic public Metaplex source history: no matching revision identified

The bounded authentic-history search did not identify the source of the target's zero-use/common-error guard or its diagnostic coordinates. It provides no authentic revision that justifies another compiler/source experiment. Historical source remains unknown. Candidate14's exact equality to11 and12/13's separate equality remain measured build facts; none is upgraded to historical source attribution by this research.

## Scope and provenance

The existing public `metaplex-foundation/mpl-token-metadata` clone is nonshallow, has851 reachable commits and99 local refs, but is a partial clone with missing historical objects. Its current checkout was not changed. Local source reads were restricted to already available objects (`GIT_NO_LAZY_FETCH=1`); failed reads are preserved in `command-receipts.json`. A broad preliminary content-history lookup encountered a missing-object/promisor failure and was stopped; no claim of exhaustive public-branch history follows from this clone.

For all18 recovered files, the saved search covers the current `programs/token-metadata/...` path and pre-move `token-metadata/...` path. A bounded primary-source fallback downloaded the last three path-changing revisions before pinned17e99434 under each path:105 immutable raw-source requests,87 successes,18 expected404s for old paths deleted by the directory-move commit. `nearby-primary-downloads.json` retains each full revision, URL, source hash, byte length and failure. Together with already accessible local versions,91 distinct file snapshots are retained as exact bytes under `public-source/`.

GitHub's primary commit-path API was independently captured for both Utilize paths at the pinned revision: three current-path entries and five pre-move entries. Those histories include the rename/delete entry, not eight unrelated source variants. Local all-ref history additionally finds the2025 Arch skeleton revision. `repository-scope.json`, the saved API JSON, exact download script and command receipts define the search boundary; there is no global claim about deleted branches, private history, forks or unretrieved old blobs.

The [pinned merge17e99434](https://github.com/metaplex-foundation/mpl-token-metadata/commit/17e99434af5ead3e989c08f32af33609821d0bc0) is dated2025-01-13. The [pinned Utilize source](https://github.com/metaplex-foundation/mpl-token-metadata/blob/17e99434af5ead3e989c08f32af33609821d0bc0/programs/token-metadata/program/src/processor/uses/utilize.rs) is exactly SHA-256 `f495c3380666f410648a4258074a7463dfd22f429d15a61415957622937eaf15`, last changed on the pinned ancestry by [4e5bcca44, Token-2022 support](https://github.com/metaplex-foundation/mpl-token-metadata/commit/4e5bcca44000f151fe64682826bbe2eb61cd7b87) in2023-12. It retains only `n > total || n > remaining`, followed by checked subtraction. It contains no zero-use rejection.

## Authentic Utilize lineage

`utilize-authentic-history.diff` compares successive distinct saved public snapshots; these are comparisons, not assertions that every pair is a direct Git parent. Full SHA-256 values and immutable source links are in `snapshot-analysis.json`; full commit metadata is saved separately.

| Public revision | Actual public change relevant to source provenance | Unwrap line / guard line |
|---|---|---:|
|1b97e2dfd,2022-11|Instruction/processor refactor creates the separate uses handler|70 /72|
|c59d7985c,2023-05|`id()` becomes `ID`|70 /72|
|3a4b3f6b5,2023-05|Initial-fees source layout/account-name changes|73 /75|
|117b32a07,2023-06|Metadata serialization becomes `metadata.save`; content also retained at move revision|73 /75|
|887708157,2023-07|Moves token-metadata under `programs/`|73 /75|
|40421f05e,2023-07|SPL token constant import/use changes|74 /76|
|2110c34f8,2023-09|Record serialization becomes `borsh::to_writer`; imports/constants also differ on this branch|72 /74|
|4e5bcca44,2023-12|SPL token constant import/use in Token-2022 merge; same file as pinned17e99434|73 /75|
|6d1d6ff46,2025-04|Arch skeleton imports and iterator naming; future/non-Solana branch source|73 /75|

All eight distinct saved Utilize source bodies contain the two-disjunct total/remaining guard and both checked subtractions. None contains `number_of_uses == 0`; none matches accepted11's full Utilize hash `9ce4753676e73e6565b957d86eecf113ce16cade3f782d849e2f7a97b640bed7`, or the reviewed14 source shape. There is no authentic public zero-guard change in the retrieved lineage to explain target block order. The public history also never establishes that source branch spelling predicts LLVM layout; the completed11–14 measurements already prevent that inference.

## Eighteen-file recovered-patch lineage

`history-snapshots.json` and `nearby-primary-downloads.json` retain per-file commit/path/hash provenance. No saved full source file equals its accepted11 recovered counterpart, even after whitespace removal. The bounded distinct-source counts are:

| Recovered file under program/src | Saved public versions |
|---|---:|
|assertions/uses.rs|2|
|error.rs|12|
|processor/burn/nonfungible.rs|4|
|processor/collection/approve_collection_authority.rs|5|
|processor/delegate/delegate.rs|5|
|processor/delegate/revoke.rs|5|
|processor/edition/convert_master_edition_v1_to_v2.rs|5|
|processor/edition/create_master_edition_v3.rs|5|
|processor/metadata/mint.rs|4|
|processor/metadata/print.rs|5|
|processor/metadata/set_token_standard.rs|3|
|processor/metadata/transfer.rs|5|
|processor/metadata/update.rs|4|
|processor/mod.rs|5|
|processor/uses/approve_use_authority.rs|5|
|processor/uses/revoke_use_authority.rs|4|
|processor/uses/utilize.rs|8|
|utils/metadata.rs|5|

`recovered-hunk-lineage.json` reconstructs the33 changed source blocks between the hash-bound public baseline archive and accepted11 source archive. It saves the exact removed/added conditions and searches for each complete added block as consecutive whitespace-normalized lines in that file's saved public versions. No complete added block was found by that narrow test. This is a bounded source observation, not proof that a protection or equivalent logic never existed anywhere, and not permission to synthesize an authentic-looking revision.

The existing recovery therefore remains target-derived source work over a public baseline; this research does not find a public commit implementing the complete18-file recovered patch. No patched snapshot was substituted into the source clone or compiled.

## Diagnostic-coordinate observations

The original target's Utilize unwrap diagnostic record says line85,column39. Accepted11/14 source has its unwrap at81,column39. Authentic saved public Utilize sources place that statement at lines70,72,73 or74, never85. The public revision most relevant to the pinned recipe places it at73. These authentic line shifts track real imports, account setup and serializer edits; none supplies the target's exact source coordinate.

For all29 decoded residual diagnostic records, `snapshot-analysis.json` reports the exact public line at the target coordinate and the line numbers of the unchanged accepted-source anchor. No retrieved snapshot puts the complete stripped accepted anchor line at that target line. This text-anchor comparison is an observation, not a compiler source-map proof: diagnostic spans can refer to subexpressions and macro expansion. Neither isolated coordinate coincidences nor missing anchors identify a unique historical file. The30 raw coordinate bytes remain genuine identity residuals; they are not repaired by adding blank lines, changing formatting or forcing locations.

## What this evidence permits

There is no newly identified authentic source revision to build. The next discriminating provenance input would be an independently preserved release/source archive, an authentic upstream/private-fork commit corresponding to the deployed program, or the original complete build receipt/source map. Any such input should first be checked against the guard,18-file hashes, decoded coordinate records and dependency lockfiles. No new build, spelling/profile sweep, source padding, coordinate fabrication, metadata variation, runtime, deployment or candidate promotion is justified by this negative bounded search.

Run `python3 -B repro/pump/metaplex-authentic-source-history/verify.py` from this repository to verify the saved packet using only Python's standard library. It rehashes every saved source, package and external archive; reproduces the91-snapshot source/coordinate comparison and33-block lineage observations; and checks primary API/download bounds. It does not access Git/network, execute a compiler or target, or change source/status/accepted artifacts.
