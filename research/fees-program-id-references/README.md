# Fees program-ID reference recovery

The reconstructed Rust build now selects the original program-ID allocations at both remaining mismatched comparison sites. All **1,608 checked readonly references** have their original relative offsets. The complete **21,079-byte readonly section** stays identical, and **578 normalized / 198 raw-local function matches** are preserved.

Across all allocated sections, the parent and new build differ in exactly two pointer bytes. The changes select the private `__ID` allocation for `Program<Pump>::try_accounts` and `Program<PumpAmm>::try_accounts`; each was previously selecting an equal-valued public `ID` 32 bytes earlier. All other allocated bytes, including the call instructions, relocated data fields and dynamic metadata, remain unchanged. Absolute addresses and the complete ELF/capture still differ from the original. Seven original functions remain unmatched.

Five Rust source files now use explicit public-static borrows where the original requires those allocations. The donation pool owner comparison also uses its public static directly. A private copy of `anchor-attribute-program` 0.31.2 adds `#[used]` to its generated public ID declaration. This keeps the public allocation distinct during LLVM constant merging; normal source references keep it live at link time. The original registry archive is included and checked against its Cargo checksum. The shared SDK and registry were not modified.

The linker recipe orders complete compiler-emitted sections as in the parent. It adds no retention rule, instruction, data fragment or padding. No object or ELF is patched after compilation. Two native builds reproduce identical artifacts. Fresh execution passes all 17,331 cases in the existing 18 suites, including the inherited application-log checks.

```sh
python3 -B research/fees-program-id-references/verify.py
python3 -B research/fees-program-id-references/test_verify.py
python3 -B research/fees-program-id-references/verify.py --materialize /absolute/new/source
```

The materializer writes the exact 46 workspace inputs, the vendored macro sources, and the linker recipe. The saved controllers use the existing Linux container and fixed `/work/next641` source and `/work/next637/vendor/used-public` dependency mounts. Recreate those mounts, or adapt their paths consistently, when reproducing on another host. Native receipts record the actual pinned compiler invocation and source hashes.

The parent is the [readonly-order recovery](../fees-readonly-order-recovery/README.md). The broader unfinished source and experiments remain in the [work checkpoint](../fees-work-checkpoint-20261027/README.md).
