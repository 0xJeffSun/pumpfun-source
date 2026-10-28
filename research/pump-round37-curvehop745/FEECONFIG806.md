# Optional feeconfig806 source stage

This source-only stage credits [PR #362](https://github.com/lalalune/pumpfun-source/pull/362), head `70ac2051298950bfcfdaf2daa05f9178f4f7b38a`. It follows `chain805` and preserves all eleven earlier stages and the default `curvehop745`. Only `trade_types.rs` changes: an imported FeeConfig alias becomes an ordinary local six-field struct with `AnchorSerialize`, `AnchorDeserialize` and `Clone` derives. The other 59 source inputs and all existing line coordinates remain unchanged.

## Source and measured boundary

The route-local type has the same ordered fields and nested types as the authenticated IDL: bump, admin, flat fees, fee tiers, stable fee tiers and exotic flat fees. Both vectors remain mandatory. The generated external `pump_fees::accounts::FeeConfig` remains the legacy/CPI account type, with its existing Owner, discriminator, checked deserialization and serialization behavior. No registry, SDK, macro or IDL was modified and no conflicting trait implementation was added.

This is intentional nominal type separation, not a claim that every public Rust trait/API or layout identity is interchangeable. The local type does not add the generated type's Debug/Default derives; inspected route consumers need its fields, serialization, deserialization and Clone. The ordinary compiler's resulting boundaries are measured, not forced by new inlining attributes or flags.

The accepted checkpoint has 806 / 1,035 injective normalized windows and 133 raw windows, retaining all 805 / 133 prior matches. The sole new normalized match is the original 1,176-byte generated unchecked FeeConfig decoder at 1137112, now implemented at 1169344. Its five immediate callee occurrences and two bounded records match original; its 744-byte checked caller remains matched. This closes the earlier 1,176-versus-408 immediate decoder difference rather than merely renaming it. A separate root compilation of this exact source reproduced both complete generated ELF files byte-for-byte. Independent source, dependency, active-cache and historical-archive preservation checks passed. This is the accepted bounded static-plus-repeat checkpoint, not a runtime result.

The new route-local 1,352-byte reader preserves the preceding reader's complete normalized body, scalar/slice/result/cleanup instructions and both shared Vec reader calls. Both actual route/trade consumers retain their complete normalized bodies and argument roles. The generated checked caller and legacy Account caller also retain their complete normalized bodies, with only the intended now-original-matched unchecked target changing.

## Limits and preservation

All other 973 function bodies are transported: 972 retain their typed identities and one is the explicit same-shape nominal reader rename. The proof checks 10,890 direct targets, 5,092 data pointers, 645 read-only relocations, old literals and per-function imports; all 32,027 read-only data bytes remain identical.

The original I/O-error tag/drop/return ABI and both vector failure exits are statically checked. An arbitrary dynamic error-destructor target is not recursively resolved or executed. The same Borsh readers and error provenance are retained; omitted visible deallocation calls do not mean allocation or owned vector cleanup can be ignored.

BondingCurve's original 624-byte versus current 600-byte dispatcher remains unmatched. Prior unequal trade-handler bodies, unresolved trade panic-origin identities, bounded PDA consumer extents, duplicate TypeId instance ambiguity, original clamp Source 57 versus current 2911, and the unmatched third split-record consumer at 527864 remain limitations. No whole-program original semantics or complete byte identity is asserted.

The materializer has 88 passing pure tests across twelve stages. These tests do not compile or execute the program. Runtime remains **NOT RUN**, including held Pump/Mayhem fixtures. Full original binary identity remains false. No binary, IR, SDK, archive or raw build/runtime receipt is included in this source-only packet. Upstream progress counts and runtime claims are not transferred.
