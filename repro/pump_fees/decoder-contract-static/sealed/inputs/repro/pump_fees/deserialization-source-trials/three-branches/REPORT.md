# FeeConfig deserializer: three bounded negative source trials

No trial reproduces the captured field-deserializer body. These are source-compiled static experiments; no trial was promoted and no runtime comparison was performed. Main remains the validated serializer checkpoint, SHA-256 `a9c4ea9e47356a91bf9bd97318746a7c207b873e32485d7786853f048d7d4afa`.

The original function at **18384 / 0x47d0** is `Account::try_from_unchecked`, with owner/lamports checks and data borrowing. It checks for an eight-byte discriminator, then calls the field decoder at **257264**, offset **896**. The checked-account wrapper at **36072** calls the same decoder at offset **1080**. This corrects the initially imprecise label of 0x47d0 as the field deserializer.

The original field decoder is **2648 bytes**, bounded by entries 257264 and 259912. It receives a slice after the discriminator, compares its length with **2504, 4065, and 4089** (total allocations 2512, 4073, 4097), and decodes separate legacy, stable-fee, and full-field branches. Common prefix reads occur independently in each branch. Its I/O failure paths call Anchor's I/O-error conversion at 709528. The final exotic fields have three direct eight-byte reads with cursor updates, a local EOF-conversion path, and no out-of-line `Fees` or `u64` reader call. Exact disassembly, call mappings and body hashes are retained.

| Trial | Candidate body | Result | Full ELF SHA-256 |
|---|---:|---|---|
| Separate allocation branches, called through unchecked method | 78104 / 2664 bytes | Helper inlined into unchecked method; discriminator slicing remains inside; register/stack and branch differences remain | `7f45345d2a5e2935c7c1409ffe325e730c5c467412c776f0d314f0883a282baa` |
| Call shared helper directly from both trait methods | 78240 / 2472 bytes | Shared helper boundary recovered; final fields use an out-of-line derived `Fees` reader | `35034bcda9384b944f5e829c84e076a4615e72eecfadcb46cd22537e5e8e8813` |
| Explicit final three `u64` deserializations | 78384 / 2704 bytes | Shared helper remains, but three out-of-line `u64` readers and different error flow remain | `c050aee86f8ad2094d52b1d99dfe213bae7de93e340d50e584cf5fa26fb0ef37` |

The first trial's 16-byte size difference is not a complete explanation: instruction alignment shows register, stack, branch and output-layout differences. The third trial has **17 direct internal calls**, including three unmatched out-of-line readers, while the original has **13**. Neither a similar length nor the observed branch thresholds is an exact-source or behavior-equivalence proof. Generic matching counts remain 398 bounded call-consistent ranges, as in the serializer baseline, with no new targeted exact body.

All three trials use clean official v1.44 builds, the same locked/offline root workspace and genuine IDLs, and **22 bound source inputs each**. Changes only affect `types.rs` in isolated workspaces. No `inline`/optimizer attributes, padding, flag search, executable editing or live execution was used. The previous positive serializer publication remains immutable.

The next discriminating check is the original decoder's treatment of Borsh entry methods and derived legacy/full structs: distinguish `deserialize` wrappers, `deserialize_reader` calls, and field temporaries using the retained dependency source and actual original call boundaries before another build. Current evidence does not identify that source spelling, so no further variants are asserted as recovered. Whole-ELF equality to the original remains false in every trial.
