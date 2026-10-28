# Optional truncation815: one sell conversion's error ownership

## Source and attribution

This local, original-backed reconstruction adds `--stage truncation815` after `v2errors814`. All fourteen earlier source stages and the default `curvehop745` remain selectable. It preserves the previous upstream contributions, including the v2 funding/error work credited to #371 and #375, and does not import either negative receiver or setter experiment.

Only one existing line in `trade_v3.rs` changes: the sell quote's shared `narrow(curve.sell_quote(amount)?)?` becomes an explicit `u64::try_from(...).map_err(sell_quote_truncation)?`. A private, unannotated callback is appended with its error construction at the original observed Source line 1140. The shared narrow helper and every other existing line remain unchanged. There are still 61 source inputs; the other 60 are byte-identical to the selected parent.

The callback name and source boundary are inferred, not recovered historical names. No inline attribute, forced copy, custom compiler pass, numeric layout trick or SDK change is used. The actual compiler emits a `core::ops::function::FnOnce::call_once` adapter; that measured result is not assumed merely from the source spelling.

## Accepted bounded static-plus-repeat result

The accepted checkpoint has **815 / 1,035 injective normalized windows and 133 raw windows**, retaining all 814 prior normalized and 133 raw matches. The one new original window is the complete 520-byte Truncation error constructor at original address 556192. Its measured adapter is original-normalized equal, including owned Error return ABI, error 6025 and `programs/pump/src/trade_v3.rs:1140`. All immediate callees, seven concrete data operands and three typed records are qualified.

A separate compilation of the exact same source reproduced both complete generated ELF files byte-for-byte. Independent preservation and backend-diagnostic checks passed. This is the accepted bounded static-plus-repeat checkpoint, not runtime validation.

## Conversion and retained interfaces

The actual producer remains the original-equal 768-byte sell quote calculation returning `Result<u128>`. Quote failure propagates first. On success, the high word is checked: zero continues with the low word, while nonzero lazily creates the owned Truncation error. Both error paths return before later fee work. The pinned Rust conversion error is unit-only, Copy and has no resource-owning destructor; no error payload clone or new cleanup responsibility is introduced.

The shared 552-byte narrow function remains unchanged, with all 21 other callsites retained. Nineteen are protected by unchanged complete caller bodies. The two remaining calls inside the changed sell handler retain their actual u128 carry/division, low/high argument slots and result handling. A local encoded-CFG check also binds the second fee multiplication's old spilled quote to the current live callee-saved register. This is bounded register/slot evidence, not a proof of arbitrary indirect control flow, aliased writes or whole-handler equivalence.

Every other old sell immediate call and data operand, and its resolved import-name multiset, is accounted for. Exactly one old narrow call is replaced by the new adapter. The other 981 functions retain complete normalized bodies, typed call/import correspondence and referenced data transport. All 645 readonly-record relocations, old readonly literals and 32,059 rodata bytes are preserved. The existing chain error adapter is rebound by original identity rather than confused with the new adapter at its old address. All 30 earlier clamp interfaces remain qualified.

## Limits

The complete sell business handler remains original-unmatched. This checkpoint does not claim recursive closure, universal semantic equivalence or historical identity for duplicate compiler-generated instances. Earlier limitations remain: the BondingCurve decoder's 624-versus-600-byte body, fee calculation and inverse wrappers' 696-versus-640 and 688-versus-632 shapes, bounded PDA seed extents, two unmatched specialized handlers, two unresolved trade panic origins, the third original split-record consumer, and the broader chain walker. The former FeeConfig unchecked-decoder gap remains closed by the earlier 806 stage; inherited historical reports do not reopen it.

The source-only materializer has 109 pure tests across fifteen stages. These tests inspect source inventories, strict patch application and rejection cases; they do not execute the target program or held fixtures. **Runtime is NOT RUN. Full original binary identity is false.** Original binaries are comparison-only, never compiler/linker inputs or output patches. No binary, IR, SDK, raw build/runtime receipt or archive is included in this publication.
