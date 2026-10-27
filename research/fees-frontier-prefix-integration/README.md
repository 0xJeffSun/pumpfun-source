# Fees: preserve the full-buffer decoder in the current source composition

The current 551-window artifact combined the math/SyncNative, sharing/admin
contexts and social-creation recoveries, but retained the older payload-only
unchecked FeeConfig decoder. This packet restores the previously recovered
full-account input convention without reverting its newer type/event definitions.
It is an independently validated composition of existing recoveries, not a new
discovery of original window 18384.

The freshly built control reproduces both current upstream outputs exactly:
872080-byte candidate `4b487083016620adcdd36cbde8088c7d8bfbf6263199e6a223a332eda402a3e3`
and symbols `8890cab6a583c34acb5a3121fe4f1a0012a5dfa0cc909848300484befa8a2977`.
Only `types.rs` then changes: checked deserialization calls the payload helper;
unchecked deserialization skips the eight-byte prefix and calls the same helper.
All other 41 inputs, program namespaces, generated types, event definitions,
dependency selections and later behavior fixes remain byte unchanged.

| Measurement | Reproduced control | Composition |
| --- | ---: | ---: |
| Unique structural pairs | 404 | 405 |
| All normalized original counterparts | 551 | 552 |
| Unmatched original windows | 34 | 33 |
| Candidate windows | 591 | 591 |
| Unique raw-equal pairs | 64 | 64 |
| All raw-local original counterparts | 118 | 118 |
| Equal decoded Location uses | 163 | 163 |

There are no normalized or raw losses. The complete 1144-byte unchecked reader
has 11 matching direct callees. Its incoming initialization closure, payload
decoder and checked reader have 17/13/12 matching callees. The actual closure
edge at offset6040 now matches, and all 3238 previous direct-edge observations
remain present without regression; the new inventory has 3249 observations.
Two owner IDs and the relocated decoder message record are separately read.
The SyncNative helper, discriminant17 input and byte17/length1 branch remain
verified, alongside sharing/admin literal and program-reader contracts, the
social messages/path/line67, relay rejection and earlier location contracts.
Sharing creation and admin dispatch still call unmatched business bodies
177720 and 127776. These checks do not establish complete transitive semantics.

Both complete 42-input snapshots, actual root compiler logs, stripped/symbol
outputs and strip replays are retained. Builds use official Linux platform-tools
v1.44, `sbpf-solana-solana`, `RUSTFLAGS=-Zremap-cwd-prefix=` and all three recorded
math-path remappings. The pinned entrypoint2.2.1 registry archive was downloaded
and checked against its locked SHA; no source/lockfile or build receipt was
retagged. Dependency compilation uses the existing target cache, not an
all-dependency clean build. `recorded-build-driver.py` retains the actual recipe.

The proposal freshly passes 17331 comparisons across 18 suites, 1542 exact query
outcome/log/compute comparisons, five 24/32/20/8/30-case matrices, 16 relay cases
and 157 strict signed social cases. Each matrix retains its own comparison
predicate; the five matrices and relay matrix compare their listed fields,
while strict social cases compare every retained field. Control runtime receipts
are explicitly reused only from the exact upstream artifact, with paths/hashes
in `experiment.json`. The two root control/proposal builds are fresh here.
No new native decoder-test or authentic fixed-admin initialization VM claim is
made. The original 35 native source tests retain their earlier candidate scope.

```sh
python3 -I -B research/fees-frontier-prefix-integration/verify.py
python3 -I -B research/fees-frontier-prefix-integration/test_scope.py
```

The normal and minimal isolated verifier checks and five adversarial mutation
checks pass. The packet seals the 187 unchanged harness scripts. Earlier P27
guard results at f8582fbd1 retain their original scope; they are not a guard claim
for this branch. Selected sources, checkpoints, workflows and ledgers are unchanged.

The fresh candidate is 872200 bytes, SHA-256
`e20e13b9151d4db7aa033c0dccf88fb437f42ea7552b3fff21ed1f0c2b9eb659`.
Raw comparisons still fail against the whole capture and meaningful original
ELF. The four stored selected core artifacts are also compared without padding,
normalization or rewriting: whole-binary identity remains **0/4**. The other
three programs were not freshly compiled. Known Crank application-log gaps,
indirect behavior, exhaustive semantics and whole-binary equality remain open.
