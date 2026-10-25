# Fees graduation predicate checkpoint

One pinned v1.44 build (v1.52 strip) from 70dd baseline changes only sharing creation to require all four decoded reserves zero. Candidate c37bd3a19c3c57618f9239e0909c937c4f711492bc75b774fdaef7363453dcb7; symbols bf6aa79d53500b59b8ed645c620a10cd356094921c4acb745ba3dc6007c12fa3. The accepted enum19 change and all other option ordering remain.

All 17,461 unchanged comparisons and the separate 10-step sequence pass. Saved verification checks 17,204 signatures in 8,644 baseline/sequence transaction fields and 80 signatures in 40 focused fields; two historical messages are separately checked. All 6,523 raw diagnostic log differences remain in diagnostic-differences.json.gz; retained 11-row diagnostic checker passes. No new fixtures were added.

The 116 sharing-creation cases contain no input with real-token reserves zero and another reserve nonzero. Therefore the newly corrected reachability domain has static evidence only. This is not whole original application/program identity. Full inventories retain 130 unattributed and 2 conflicting original windows.

`initial-source-review.tar.gz` retains full typed decoder/parser/application proof and the incorrect initial branch-direction analysis plus its correction. `runtime-repository.tar.gz` contains unchanged runner-repo/ and validation-layer/. `receipts-and-verification.tar.gz` contains runtime/ and saved-verification/.

Run `python3 -B verify.py --runtime-signatures` for self-contained saved-evidence checks and signature reverification. It executes no target and performs no build. The manifest requires the exact full file set; caches are prohibited.
