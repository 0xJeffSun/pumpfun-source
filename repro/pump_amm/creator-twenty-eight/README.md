# PumpSwap creator reassignment checkpoint

This candidate implements 28 of 38 published IDL handlers. It adds
`migrate_pool_coin_creator`, `set_coin_creator` and `admin_cto_pool` to the previous
25-handler checkpoint. The complete program is not reconstructed.

The clean main-source build is **849,040 bytes**, SHA-256
`21d30fb50cb0cb7c701d16b9d2be3bbb2f19baf6f6ebad3254f7ac51ffe19742`.
The captured original is 10,485,715 bytes, SHA-256
`6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7`.
Whole-file equality is false; the first difference is byte 24. No executable
bytes or headers were patched to improve that comparison.

All **12,792 cases across 17 suites passed**. New coverage consists of 327 direct
creator-migration/setter cases and 159 CTO cases. Of the latter, 140 reach the AMM
handler through captured Pump CPI; the other 19 reject upstream and do not isolate
AMM context checks. Actual original Pump supplies its own PDA signer inside CPI;
only ordinary test-owned keys sign the top-level transaction. Signature checks
remain enabled. The fixtures are synthetic local state, not proof that all injected
states are reachable in a deployed protocol.

The source snapshot contains the independently compiled Rust, manifests and lock.
The test snapshot retains all local Python imports used by the PumpSwap suites;
`test-source-sha256.json` records its inputs. Restore these snapshots into a separate
checkout with the repository's captured `evidence/` and imported research fixtures
to replay old results if maintained source changes. Run from that checkout's root.
Build records retain the compiler/SDK/source hashes, command and log. Platform-tools
v1.52, Anchor 0.31.1 and the selected dependency graph are candidate choices,
not established historical versions. Metadata parsing adds `mpl-token-metadata`
5.1.1 through Anchor SPL's metadata feature.

The `attempts/` directory preserves superseded build records, exact source snapshots,
candidate artifacts where compilation succeeded, and mismatch receipts. Build 1
used a stored pool bump and misplaced the creator no-op guard; build 2 corrected
both. Build 3 failed on a missing USDC constant. Build 4 compiled but incorrectly
checked cashback before holder-reward conversion. The final source fixes that
ordering. Every retained source snapshot was verified against its build-attempt
hashes. No failed draft is represented as successful parity.

See `audit/pump_amm/CREATOR_REASSIGNMENT_RECOVERY.md` for recovered behavior and
limits. This package establishes bounded comparisons, not a complete security
audit, historical-source attribution, exhaustive context equivalence or binary
identity. The source security review frozen at `329fc44` excludes these additions.
No live transaction was broadcast.
