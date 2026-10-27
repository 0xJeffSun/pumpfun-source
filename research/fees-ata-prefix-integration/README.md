# Fees associated-token validation recovery

The reconstructed Rust associated-token validator now matches all **739 original instructions / 6,080 bytes** after call and address normalization. Composed with the accepted Withdraw recovery, Fees reaches **581 of 585 normalized functions** and **200 raw-local matches**, with no loss of previous matches.

An ordinary typed Rust `try` block covers account creation and the owner check. Its result propagates before the token-data borrow. This reproduces both the original invoke-success branch and the return-buffer reload before borrow cleanup. The source patch changes two files and preserves the existing macro source lines, module order, program-ID fixes and compiler dependency sources.

The verifier checks **4,388 direct calls** in matched original functions, **62 code pointers**, **2,045 data pointers**, all **379 relocated data fields** and every other compiled function against the original/parent mapping. The complete **21,079-byte readonly payload** and all **105 Source records** remain intact. The linker orders 1,474 complete compiler-emitted input sections.

Two fresh normal Cargo builds produce identical symbol and stripped files. All **17,331 runtime cases across 18 suites** pass. Integrity and corruption tests cover source/error propagation, binary references, layout, runtime cases, unexpected files, symlinks, special files and disabled Python assertions.

Four original functions remain unmatched: Extend, Sweep, Crank and CreateDonation. Matching normalized code does not prove a referenced unmatched callee. **Whole ELF and capture equality remain false.**

```sh
python3 -B research/fees-ata-prefix-integration/verify.py
python3 -B research/fees-ata-prefix-integration/test_verify.py
python3 -B research/fees-ata-prefix-integration/verify.py --materialize /absolute/new/source
```

The materializer writes all 46 workspace inputs, inherited macro dependency and linker recipe. The captured recipe uses the pinned Linux v1.44 SDK, `/work/next647` sources and `/work/next637/vendor/used-public`; recreate those mounts or adapt paths consistently. The parent is the [Withdraw integration](../fees-withdraw-tuple-integration/README.md). Preliminary orphan output was used only to derive section ordering; it is excluded from native acceptance evidence, which comes from the two fresh builds included here.
