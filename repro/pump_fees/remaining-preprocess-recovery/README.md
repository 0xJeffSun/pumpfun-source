# Fees: completed-curve remaining-account preprocessing

The committed557-window source gains the complete original2520-byte function at231576. The result is558/585 normalized windows,411 unique structural pairs,118 raw-local windows and27 unmatched windows. No prior normalized/raw match or positive direct-callee observation is lost. The enclosing original legacy/V2 business caller bodies remain unmatched. Whole meaningful-ELF and captured-file equality remain false.

## Source and ABI recovery

The existing private helper's &BondingCurve parameter was optimized to a bool argument, while the original loads the complete flag through a curve pointer at offset72. Moving the helper into the observed public instructions/fee_sharing/mod.rs module and exposing it as a public function preserves the pointer ABI. The three actual source error sites are at lines60,74 and83; no artificial location attribute is used.

Original code also copies the last AccountInfo key into a stack Pubkey before comparison. `last.key()` produces that owned value; dereferencing last.key directly allowed the copy to disappear. The final shared data Ref remains alive while an if/else expression constructs the returned result, then drops once at the common end. A nested scope and explicit early-return controls produced different instruction ordering and remained unmatched.

The helper returns the original slice when the curve is incomplete. For a complete curve it requires a nonempty slice, derives the pool-authority and pool PDAs, checks the last key, and removes that last entry. A non-AMM owner is accepted after the key check. AMM-owned data is borrowed; length below287 is accepted, otherwise the little-endian word at279..287 must be zero. It neither deserializes the full pool nor checks its discriminator.

All17 real outgoing callsites have complete matching callee bodies. All19 direct relocated pointer uses are bounded and checked: seed strings, program IDs, error tags, source paths, formatting vtable metadata and methods, and a panic Location. The166 decoded Location cohort matches, adding one use to the previous165. Positive direct-callee observations increase3293→3310 without regression. These checks do not certify exhaustive transitive behavior or whole read-only-section equality.

## Pinned parent and build

Parent is e602e7460dc13b51746860f2fdb6e9530c648f51, `repro/pump_fees/relay-donation-encoder`. parent.json records its actual42 source hashes and decoded artifact hashes, checked against the new baseline without a Git-history dependency at verification time.

Baseline reproduces stripped d2fbc6390ef2bd37fea12f710d4bd2ec9b101b10c55d979708432a2d6971c5b6 and symbols727be353a7de671a366e5659b78e4b5c1d7fcb663dc1ca272e5397337d376c6f.

Candidate stripped SHA256:5485269dd24acf194a4de4ca913cf083b3ac88fff94ca8538b9f26dd18b96610.
Candidate symbols SHA256:b95caff0d81e8f62fd61ba1d8bc323183532036e445d70203d0ea2703f2cff1d.

Both actual builds use official Linux platform-tools v1.44, canonical target, locked offline dependencies, three established math-path mappings and a private cached target. This is not an all-dependency clean rebuild. Exact42-input snapshots, commands, logs, results and both outputs are retained. Source changes are confined to sharing_update.rs and instructions/fee_sharing/mod.rs. Prior packets and public selections were untouched by this experiment.

## Runtime bounds

Both baseline and candidate freshly pass417 signed sharing-update comparisons, checking errors, account states, events, inner instructions and return values. There are no new application-log differences versus557 when explicit compute-consumption lines are excluded. The generic417-case suite does not set the curve complete flag and does not cover the new helper's completed-curve branch.

An additional24-case suite explicitly exercises both signed entrypoints with the flag set, including empty/wrong pool accounts, non-AMM ownership, lengths0/1/286/287/288/300, and zero/nonzero words. All24 outcome/state/inner/event/return/transaction comparisons pass. The22 completed-curve cases also match non-compute application logs. Two incomplete-curve controls preserve existing downstream diagnostic differences. Dynamic borrow conflicts, invalid memory, exhaustive argument combinations and allocator exhaustion are not covered.

## Verification

```sh
python3 -B repro/pump_fees/remaining-preprocess-recovery/verify.py
python3 -B repro/pump_fees/remaining-preprocess-recovery/test_scope.py
```

Verification recomputes complete-body inventory, call and Location evidence, checks all direct helper data references and saved runtime observations, and rejects missing/extra members and symlinks. It does not compile or run target code. Mutation tests reject altered source, artifact bytes, extra members and symlinks. Large JSON receipts, binaries and logs use deterministic gzip with exact decompressed hashes. Source JSON must be decompressed before a build; recorded environment paths require equivalent pinned tooling and offline dependencies elsewhere. No deployment occurs.

The verifier also checks all parent557 source/artifact hashes directly from the retained sibling packet, including in a shallow checkout. Whitespace-sensitive source and patch bytes are preserved with gzip.
