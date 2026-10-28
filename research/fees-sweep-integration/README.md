# Fees Sweep recovery

The reconstructed Rust `sweep_buyback` handler matches all **848 original instructions / 6,960 bytes** after call and address normalization. Composed with the accepted Extend, ATA and Withdraw recoveries, Fees reaches **583 of 585 normalized functions**. The qualified raw-match count is **200**.

The two-file source patch reads the bump, takes the mutable destination borrow, and then validates the index. It uses temporary signer-seed arrays, propagates the claim error at the caller, and keeps checked claimed-counter updates in small state methods. The existing Clock, overflow and guard source locations remain intact.

The verifier requires **4,474 direct calls**, **63 code pointers**, **2,092 data pointers**, all **379 relocated data fields**, and all **585 other compiled function signatures** to retain the original/parent mapping. It also checks the complete **21,079-byte readonly payload**, all **105 Source records**, and **1,474 complete compiler-emitted input sections** in the linker recipe.

Two fresh normal Cargo builds produce identical symbol and stripped files. All **17,331 runtime cases across 18 suites** pass. The packet retains execution receipts, source materialization and corruption guards. Crank and CreateDonation remain unmatched. **Whole ELF and capture equality remain false.**

```sh
python3 -B research/fees-sweep-integration/verify.py
python3 -B research/fees-sweep-integration/test_verify.py
python3 -B research/fees-sweep-integration/verify.py --materialize /absolute/new/source
```

The materializer writes all recorded workspace inputs, the inherited macro dependency and linker recipe. Recorded builds use the pinned Linux SDK, `/work/next650` sources and `/work/next637/vendor/used-public`; recreate those mounts or adapt paths consistently. The parent is the [Extend integration](../fees-extend-integration/README.md). Native acceptance evidence comes from the two qualified builds included in the packet; exploratory unqualified builds establish source and code shape only.

The verifier also checks that stripping preserves ELF header fields, complete program headers, and allocated-section metadata. Its corruption tests reject independently changed stripped entry points, segment permissions, and section flags.

These results qualify the materialized research source in this packet. The maintained `programs/pump-fees` tree has a different state/module layout and is a separate build target.
