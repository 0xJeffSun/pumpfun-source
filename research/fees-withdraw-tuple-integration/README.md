# Fees Withdraw tuple integration

The [published Withdraw source](../fees-withdraw-tuple-ownership-source/README.md) now composes with the accepted Social recovery and qualified linker layout. The reconstructed Rust body matches all **967 original instructions / 8,000 bytes** after call and address normalization. Fees reaches **580 of 585 normalized functions**, retaining all **198 raw-local matches**.

The source changes are limited to the withdrawal handler and its delegate. The current module declaration order remains unchanged, preserving the original ordering of merged readonly constants. No assembly, captured instruction fragments, private-layout access, padding or post-link rewriting is used.

The verifier binds every other compiled function to its parent and checks all **4,358 direct calls** in matched original functions, **62 code pointers**, **2,026 data pointers**, and **379 relocated data fields**. The complete **21,079-byte readonly payload**, program-ID reference fixes and all **105 Source records** are preserved. The linker recipe orders 1,474 complete compiler-emitted input sections.

Two native Rust builds reproduce identical symbol and stripped files. Fresh execution passes **17,331 cases across 18 suites**. The regression suite also rejects coherent source, binary, layout, runtime and packet-integrity mutations.

Five original functions remain unmatched: Extend, Sweep, Crank, CreateDonation and the associated-token validator. Referenced callees can still be unmatched. **Whole ELF and capture equality remain false.**

```sh
python3 -B research/fees-withdraw-tuple-integration/verify.py
python3 -B research/fees-withdraw-tuple-integration/test_verify.py
python3 -B research/fees-withdraw-tuple-integration/verify.py --materialize /absolute/new/source
```

The materializer writes the 46 workspace inputs, inherited macro dependency and linker recipe. Saved build controllers retain the original `/work/next645` and `/work/next637/vendor/used-public` mounts and use a warmed Cargo target; recreate those mounts or adapt paths consistently on another host. The parent is the [Social claim-v2 recovery](../fees-social-claim-v2-recovery/README.md).
