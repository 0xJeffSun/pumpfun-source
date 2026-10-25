# ATA authentic build-provenance follow-up

**The authentic lockfile for sourcef5ce86 is available and equals candidate2's lock. Its association with the uploaded/deployed ATA and the original Cargo unit graph/compiler invocation remains unproved.** This bounded primary-source pass found no discriminating new build receipt and launched no experiment. No tracked file, compiler flag/version/path, executable, Docker daemon, VM or chain account was changed.

## Positive primary receipts

The official immutable [`f5ce86d43dd31ddefb96d4e8cdd67dd073dc5dca/Cargo.lock`](https://github.com/solana-labs/solana-program-library/blob/f5ce86d43dd31ddefb96d4e8cdd67dd073dc5dca/Cargo.lock) has180,100bytes, SHA256 `3c8f402f40488908503e9cc088388c1f95848d79da5141b5cb1a14006d74428b`. Its Git blob is `be954f98559cd5158a0df6301e8b1611eec34248`, independently recomputed from the full downloaded bytes and checked against the official complete tree response. This is the same lock hash in candidate2's retained source manifest. The full official lock bytes and existing candidate manifest/comparison association are saved. Calling the source revision's lock simply “unavailable” would be inaccurate; calling it the uploader's lock would go beyond the evidence.

Both official [v1.1.0 release assets](https://github.com/solana-labs/solana-program-library/releases/tag/associated-token-account-v1.1.0) were freshly downloaded through their public release URLs. Asset73609167 (`spl_associated_token_account.so`) and73609187 (`spl_associated_token_account-1.1.0.so`) each have105,032bytes and SHA256 `6804554e69fd3a58caa191dc4a58f4c67223d30ca28ab8987f39fc18d2f7374d`, identical to the captured ATA. Both metadata records name uploader `joncinque`; their publisher digest fields are null. Download hashes establish current release-content identity, not signed build provenance or an original unit graph.

Official [PR3427](https://github.com/solana-labs/solana-program-library/pull/3427) identifies sourcef5ce86 as its merged commit and `be092575cca4aa856f871c2c35725e973819b28f` as its head. Their entire Git trees are the same `142baa00de7466d6aab8f7e7dfc02bfda6c0dec4`. Recorded UTC chronology is:

| Event | Time |
| --- | --- |
| Unversioned asset upload |2022-08-03T22:12:43Z|
| Versioned asset upload |2022-08-03T22:12:52Z|
| Same-tree PR head commit |2022-08-03T22:24:45Z|
| PR opened |2022-08-03T22:26:26Z|
| f5ce86 commit |2022-08-03T23:03:04Z|
| PR merged |2022-08-03T23:03:05Z|

The identical-tree head does not supply a newly found preupload committed source: it is also later than the uploads. This does not exclude building the same tree from an earlier working copy, nor prove the asset used the preceding master revision. Timestamps alone do not select a new recipe.

## Bounded CI/uploader checks

This pass made14 read-only official GitHub metadata requests, six immutable source-file requests and two asset downloads. It inspected the prior sealed access/query packet first, then added combined commit statuses, PR head/review metadata and the named artifact query. Exact responses, URLs, timestamps, HTTP statuses, pagination headers and hashes are retained.

- Combined status endpoints forf5ce86, prior tag-controlc00194, preupload-controlabc63 and PRheadbe092 return HTTP200 with zero contexts and no pagination link. Their API-default `state=pending` is **not** evidence of a pending build when the status list is empty.
- PRhead check-runs return HTTP200/zero entries. PR3427 review comments and reviews return HTTP200/zero entries. The PR commits endpoint supplies the one head commit and same-tree evidence above.
- The official frozen token workflow builds/tests token before ATA and uploads `target/deploy/*.so` as **token-programs**. The current official `actions/artifacts?name=token-programs&per_page=100` endpoint returns HTTP200 with total_count0 and no pagination link. No artifact download/build log was recoverable through that query.
- The frozen Anchor.toml names Anchor0.24.2 and Solana1.10.33. The release verification command names Solana1.10.33, Debian bootstrap and Ubuntu20.04. These are source/release declarations; no exact Anchor executable, host Rust/Cargo bootstrap result, Cargo unit graph, full BPF rustc command or matching intermediate library is attached to the asset metadata.

The official source workflow and wrappers are retained to distinguish declarations from executed receipts. Previously tested warnings flags/old compiler artifacts remain negative controls; they do not prove source absence or authorize repeating flag/compiler/path experiments. No upload-to-CI association was found in the checked primary records. Empty present-day results do not prove CI never ran, explain retention, or establish that an authentic receipt cannot exist elsewhere. Three narrow web searches for the exact hash/source/release terms also yielded no result; they are not an exhaustive internet-absence proof.

## Precise remaining gap

The captured asset is positively attributed to the public release content; candidate2 is positively associated with authenticf5ce86 source/lock. The missing link is an uploader/build/verification receipt associating **that asset hash** with a source checkout/tree, the lock actually used, feature/unit graph, host/BPF Cargo and compiler closure, and full invocations, especially the spl_token_2022 metadata input governing specialization identity/order. No such discriminating record was recovered. The existing307-position residual and source association remain unchanged, and no further experiment is selected by this pass.

`verify.py` is standard-library-only and offline. It checks all saved receipt/file hashes, Git blob identity, exact lock-to-candidate association, release asset hashes/uploader/times, tree/chronology facts and bounded negative endpoint results. Optional `--repo` rehashes prior tracked evidence and the captured ATA. It executes no compiler/program and writes nothing. This packet is separate from the frozen audit publication and does not modify or delay its CI.
