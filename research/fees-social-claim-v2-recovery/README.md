# Fees Social claim-v2 instruction recovery

The reconstructed Rust `claim_v2` now matches all **1,303 instructions / 10,664 bytes** in the original function after call and address normalization. This raises the Fees result to **579 of 585 normalized functions**, retaining all **198 raw-local matches**. Six original functions and complete ELF/capture equality remain unresolved.

The associated-token helper receives its two public keys by value. Its two Social callers use those owned values. The Social signer code reads the bump before cloning the user ID and the platform afterward, matching the original load order. An explicit final token-branch return restores the original shared cleanup-block placement. These are ordinary Rust source changes; no assembly, target fragments, private-layout access, added padding or post-link rewriting is used.

The parent program-ID fixes and complete **21,079-byte readonly payload** are preserved. The verifier checks all **4,333 direct calls** in matched original functions, **62 code pointers**, **2,012 data pointers**, and all **379 relocated data fields** against original function identities or section-relative targets. It also preserves every other compiled function and its calls/pointers relative to the parent.

The two calls from Social into the associated-token validator reach the correct function, but that callee's body is still unmatched. This is not a claim of recursive or whole-contract byte identity. The pre-integration independent report records that boundary explicitly.

Two native builds reproduce identical stripped and symbol artifacts. Fresh execution passes all **17,331 cases across 18 suites**, including inherited application-log checks. The layout recipe orders complete compiler-emitted input sections and preserves the SDK layout structure.

```sh
python3 -B research/fees-social-claim-v2-recovery/verify.py
python3 -B research/fees-social-claim-v2-recovery/test_verify.py
python3 -B research/fees-social-claim-v2-recovery/verify.py --materialize /absolute/new/source
```

The materializer writes the exact 46 workspace files, inherited macro dependency, and linker recipe. Saved build controllers retain their original `/work/next644` source and `/work/next637/vendor/used-public` dependency mounts; recreate those mounts or adapt paths consistently on another host. The parent is the [program-ID recovery](../fees-program-id-references/README.md).

The review verifier rejects unlisted files, symlinks and special files before reading packet contents, and fails closed under Python `-O`. Twelve regression tests cover these boundaries and coherent source, build, binary, layout and runtime mutations. A separate review rerun of both Social claim suites passes all 974 cases against this candidate; the 17,331-case full-suite receipts retain their original execution bindings.
